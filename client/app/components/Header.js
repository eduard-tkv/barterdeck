import React from 'react';
import { Route, Link } from 'react-router-dom';

const Header = ()=>(
	<nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
    <button className="navbar-toggler navbar-toggler-right" type="button" 
      data-toggle="collapse" data-target="#navbarCollapse" 
      aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		<Link to="/" className="navbar-brand">Barterdeck</Link>
		<div className="collapse navbar-collapse" id="navbarCollapse">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item active">
					<Link className="nav-link" to="/login">Login</Link>
				</li>
        <li className="nav-item">
					<Link className="nav-link" to="/register">Register</Link>
				</li>
				<li className="nav-item">
					<Link to="/list-item" className="nav-link">List New Item</Link>
				</li>
			</ul>

			<form className="form-inline mt-2 mt-md-0">
				<input className="form-control mr-sm-2" type="text"/>
				<button className="btn btn-search my-2 my-sm-0" type="submit">Search</button>
			</form>

		</div>
	</nav>
);

export default Header;
