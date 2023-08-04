I am going to assume you're already vaguely familiar with friendly error handling crates like [`Eyre{:.token}`](https://docs.rs/eyre/latest/eyre/) or [`Anyhow{:.token}`](https://docs.rs/anyhow/latest/anyhow/) which can be created from any type `T: Error{:.token}`. Another useful tool is the `?{:.token}` operator.

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
#[derive(Debug)]
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

impl Display for ApiError {
    /// ...
}

/// ...
/// ...
/// ...

/// ...
/// ...
/// ...

async fn try_get_data() -> Result<Data, ApiError> {
    let res = reqwest::get("https://api.example.com/data").await?;

    let data = res.json::<Data>()?;

    Ok(data)
}
```

# Why Is It So Verbose?

Luckily there is a fix for that, you can use the [`thiserror{:.token}`](https://docs.rs/thiserror/latest/thiserror/) crate which is useful derive macro whos motto is that its the same as doing it by hand. Specifically it handles the `Display{:.token}`, `Error{:.token}` and `From<T>{:.token}` traits for you.

# When to Use Eyre/Anyhow?

I think the intended use of anyhow is that you should wrap your binaries entry points in a `anyhow::Result<()>{:.token}` (or eyre), this way you can propagate an error message to the top of the stack. And sometimes a function should just either succeed or panic, and this is where `Eyre{:.token}` amd `Anyhow{:.token}` can be useful again.

Also I think ideally nothing would ever panic, instead it just should return a `anyhow::Result<()>{:.token}` that way you dont need to go out of your way to implemenet a panic hook.
