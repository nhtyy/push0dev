I am going to assume that you're already vaguely familiar with friendly error handling crates like [`Eyre{:.token}`](https://docs.rs/eyre/latest/eyre/) or [`Anyhow{:.token}`](https://docs.rs/anyhow/latest/anyhow/) which can be created from any type `T: Error{:.token}`, and the basics of rust errors (hint: they're just another type).

A useful tool when dealing with results is the `?{:.token}` operator.

```rust
let x = result?;
```

Which is the same as:

```rust
let x = match result {
    Ok(val) => val,
    Err(err) => return Err(err.into())
}
```

To get straight to the point, the reason you don't want to go around just using `anyhow::Result<T>{:.token}` everywhere is becasue you lose the ability to explicity handle certian error variants.

# Example

Let's look at a function that calls an http api, serializes the data it gets and returns it in an `anyhow::Result<T>{:.token}`:

```rust
async fn try_get_data() -> anyhow::Result<Data> {
    let res = reqwest::get("https://api.example.com/data").await?;

    let data = res.json::<Data>()?;

    Ok(data)
}
```

In this case, both of these errors are actually the same type (`reqwest::Error{:.token}`), but let's imagine they weren't. We have a `ClientError{:.token}` from the `get{:.token}` method, and a `ParseError{:.token}` from calling `json{:.token}`, but since you turned them both into an `anyhow::Error{:.token}`, consumers of this function can no longer explicity handle each case!

For instance, let's say we wanted to retry the request if we get a `ClientErrort{:.token}` but not if we get a `ParseError{:.token}`. With just any `anyhow::Result{:.token}`, we don't have actually have a way to do this.

If you think the consumer of your function would want this ability you should allow them to do so by doing something like this:

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

Luckily there is a fix for that. You can use the [`thiserror{:.token}`](https://docs.rs/thiserror/latest/thiserror/) crate which is a useful derive macro whose motto is that its the same as doing it by hand. Specifically, it handles the `Display{:.token}`, `Error{:.token}` and `From<T>{:.token}` traits for you.

# When to Use Eyre/Anyhow?

I think the intended use of these friendly error handling libs is that you should wrap your binaries entry points in a `anyhow::Result<()>{:.token}` (or eyre). This way, you can propagate an error message to the top of the stack.

Also, I think most things in your crate should never panic. Instead, it just should return a `anyhow::Result<()>{:.token}`. For instance, you may have a utility function like:

```rust
fn conditional_err() -> anyhow::Result<()> {
    /// ...
}
```

That way, you don't need to go out of your way to implemenet a panic hook if you want always want nice error messages. Though this doesn't apply to everything: i.e. I think it makes sense for a out of bounds `Vec{:.token}` read to panic.
