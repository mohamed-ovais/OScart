import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

export default function Profile() {

    const {user} = useSelector(state=>state.authState);
    return (
        <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
                <figure className='avatar avatar-profile'>
                    <img className="rounded-circle img-fluid" src={user.avatar??'/images/default_avatar.png'} alt='' />
                </figure>
                <Link to="/myprofile/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                    Edit Profile
                </Link>
            </div>

            <div className="col-12 col-md-5">
                <h4>Full Name</h4>
                <h5 style={{color:'green'}}><b>{user.name}</b></h5>

                <h4>Email Address</h4>
                <h5 style={{color:'green'}}><b>{user.email}</b></h5>
                
                <h4>Joined</h4>
                <h5 style={{color:'green'}}>{String(user.createdAt).substring(0,10)}</h5>

                <Link to="/orders" className="btn btn-danger btn-block mt-5">
                    My Orders
                </Link>

                <Link to="/myprofile/update/password" className="btn btn-primary btn-block mt-3">
                    Change Password
                </Link>
            </div>
        </div>
    )
}