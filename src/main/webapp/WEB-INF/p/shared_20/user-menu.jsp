<%@include file="/WEB-INF/p/shared/taglibs.jsp"%>

<div id="menu">
 
<ul>

  <li class="home-menu-item">
    <a href="<s:url action="login" namespace="/home"/>">Home</a>  
  </li>
  
  <li>
    <a href="<s:url action="search" namespace="/user"/>">Browse VO</a>
  </li>
  
  <li>
    <a href="<s:url action="search" namespace="/role"/>">Configuration Info</a>
  </li>
  
  <li class="last-menu-item">
    <a href="<s:url action="search" namespace="/attribute"/>">Other VOs on this server</a>
  </li>


</ul>
</div>