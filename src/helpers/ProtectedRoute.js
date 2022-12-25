import PropTypes from 'prop-types'
import { Route , redirect } from 'react-router-dom'

export default function ProtectedRoute({user , children , ...rest}){
    return (
        <Route
        {...rest}
        render={({location}) => {
            if(user){
                return children
            }

            if(!user){
              return redirect("/login") 
            }

            return null
        }}
        />
    )
}

ProtectedRoute.propTypes = {
    user:PropTypes.object,
    children:PropTypes.object.isRequired
}