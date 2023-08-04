I am going to assume you're already vaguely familiar with friendly error handling crates like `Eyre{:.token}` or `Anyhow{:.token}` which can be created from any type `T: Error{:.token}`. Another useful tool is the `?{:.token}` operator.

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

To get straight to the point, the reason you dont want to go around just using `anyhow::Result<T>{:.token}` everywhere is becasue you lose the ability to explicity handle certian error variants

# Example

To give a concrete example lets look at a function that calls an http api, searlizes the data it gets and returns it using `anyhow::Result<T>{:.token}`

```rust
    async fn try_get_data() -> anyhow::Result<Data> {
        let res = reqwest::get("https://api.example.com/data").await?;

        let data = res.json::<Data>()?;

        Ok(data)
    }
```

in this case, both of these errors are actually the same type (`reqwest::Error{:.token}`), but lets imagine they werent. So you could think we have a `ClientError{:.token}`, and a `ParseError{:.token}`, but since you turned them both into an `anyhow::Error{:.token}` consumers of this function can no longer explicity handle each case!

For instance, lets say we wanted to retry the request if we get a `ClientErrort{:.token}` but not if we get a `ParseError{:.token}`. With just any `anyhow::Result{:.token}`, we dont have actually have a way to do this.

If you think the consumer of your function would want this ability you should allow them to do so by do something like this

```rust
    enum ApiError {
        Client(ClientError),
        Parse(ParseError)
    }

    impl std::error::Error for ApiError {}

    /// this is what allows the `?` operator to work
    impl From<ClientError> for ApiError {
        fn from(err: ClientError) -> ApiError {
            ApiError::Client(err)
        }
    }

    impl From<ParseError> for ApiError {
        fn from(err: ParseError) -> ApiError {
            ApiError::Parse(err)
        }
    }

    /// ...
    /// ...
    /// ...

    /// theres some other traits you need to satisfy to implemenet error here

    /// ...
    /// ...
    /// ...

    async fn try_get_data() -> Result<Data, ApiError> {
        let res = reqwest::get("https://api.example.com/data").await?;

        let data = res.json::<Data>()?;

        Ok(data)
    }
```
