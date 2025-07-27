import NameForm from '../../Components/NameForm/NameForm.jsx'
import Game from '../../Components/Snake/Snake.jsx'

export const ROUTES = [
    {
        path: '/',
        element: < NameForm onSubmitName={(name) => console.log("Name submitted:", name)}/>
    },
    {
        path: '/game',
        element: < Game/>
    }
]