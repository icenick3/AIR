import React, {useState} from 'react';
import './Form.css'

const Form = ({form, setForm}) => {

const [activ, setActive] = useState(false)
    const onsubmit = (e) => {
        e.preventDefault()
        e.target.reset()
        setActive(true)
        setTimeout(()=>{
            setActive(false)
            setForm(false)
        }, 5000)
    }


    return (
        <div  className={form ? "rform show404" : "rform"} onClick={()=>setForm(false)}>
            <form onSubmit={onsubmit} className={form ? "formXX show404" : "formXX"} onClick={(e) => e.stopPropagation()}>
                <input type="text" placeholder="email"/>
                <input type="text" placeholder="number"/>
                {activ && <p>Merci pour votre commande, notre responsable vous contactera bientôt</p>}
                <button>Buy</button>
            </form>
        </div>

    );
};

export default Form;