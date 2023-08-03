I am going to assume you're already vaguely familiar with friendly error handling crates like `Eyre` or `Anyhow` (both of which are very useful in their own way) which can be created from any type `T: Error`. Another useful tool is the `?` operator.

```rust
    let x = result?;
```

which is the same as,

```rust
    let x = match result {
        Ok(val) => val,
        Err(err) => return Err(err)
    }
```

To get straight to the point, the reason you dont want to go around just using `anyhow::Result<T>` everywhere is becasue you lose the ability to explicity handle certian error variants

# Example

To give a concrete example lets look at a function that calls an http api, searlizes the data it gets and returns it using `anyhow::Result<T>`

```rust
    async fn try_get_data() -> anyhow::Result<Data> {
        let res = reqwest::get("https://api.example.com/data").await?;

        let data = res.json::<Data>()?;

        Ok(data)
    }
```

in this case, both of these errors are actually the same type (`reqwest::Error{:rust}`), but lets imagine they werent. So you could think we have a `ClientError{:rust}`, and a `ParseError{:rust}`, but since you turned them both into an `anyhow::Error{:rust}` consumers of this function can no longer explicity handle each case!

For instance, lets say we wanted to retry the request if we get a `ClientError::Timeout{:rust}` but not if we get a `ParseError::InvalidJson{:rust}`. With just any `anyhow::Result{:rust}`, we dont have actually have a way to do this!
