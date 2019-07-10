package com.alpaslan.rest.webservices.restfulwebservices.jwt.resource;

import java.io.Serializable;

public class JwtTokenRequest implements Serializable {

	private static final long serialVersionUID = -5616176897013108345L;

	private String username;
	private String password;

	//{
    //	"token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbHBhc2xhbiIsImV4cCI6MTU2MzE0MzE4NywiaWF0IjoxNTYyNTM4Mzg3fQ.LgFD1dchS0Fep1cPc9ymTHej7NeVIB_ntcyR1Q30peW2QVg8yh2L-NkWuv800BH35vZ2AbtuhwswhHFO-CVhag"
    //}

	public JwtTokenRequest() {
		super();
	}

	public JwtTokenRequest(String username, String password) {
		this.setUsername(username);
		this.setPassword(password);
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}