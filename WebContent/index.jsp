<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.net.InetAddress" %>    
<%
	String ip = request.getRemoteAddr();
	if (ip.equalsIgnoreCase("0:0:0:0:0:0:0:1")) {
	    InetAddress inetAddress = InetAddress.getLocalHost();
	    String ipAddress = inetAddress.getHostAddress();
	    ip = ipAddress;
	}	
%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Hismax TimaService</title>
	</head>
	<body>
		<img src="logo.png" width="360" height="90">
		<br>
		<% out.println("Hello world! -- From TimaService"); %>
		<br/>
		<%= new java.util.Date() %>
		<br/>
		<% out.println("your ip address:"); %>
		<%=ip %>
		<br/>
		<a href="/TanTimaServices/testJNDI">Test WebServer JNDI</a>


</body>
</html>