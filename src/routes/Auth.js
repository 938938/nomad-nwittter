// import { authService } from "firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { useState } from "react";

const Auth = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const onChange = (e) => {
    const {target : {name, value}} = e;
    if(name === 'email'){
      setEmail(value)
    } else if (name === "password"){
      setPassword(value)
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      let data;
      if(newAccount){
        data = await createUserWithEmailAndPassword(
          auth, email, password
        )
      } else {
        data = await signInWithEmailAndPassword(
          auth, email, password
        )
      }
      console.log(data);
    } catch(error){
      console.log(error)
    }
  }
  return(
    <div className="Auth">
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
      </form>
      <div>
        <button>Continue with Google</button>
      </div>
    </div>
  )
}

export default Auth;