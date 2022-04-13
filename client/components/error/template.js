export default function ErrorMessage({message}){

return(<div className="alert alert-danger">
<h4>A manóba....</h4>
<ul className="my-0">
  {message.response.data.errors.map(err => (
    <li key={err.message}>{err.message}</li>
  ))}
</ul>
</div>)
}