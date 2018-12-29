package coupon.sys.services.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;

import coupon.sys.core.facade.CustomerFacadeInterface;

/**
 * this class is a filter for path /customer/*
 * it checks if the user have a session from type customerFacade
 * 
 * @author YECHIEL.MOSHE
 *
 */
@Component
public class CustomerFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        HttpSession session = req.getSession(false);
        
        if (session == null || session.getAttribute("CustomerFacade") == null || !(session.getAttribute("CustomerFacade") instanceof CustomerFacadeInterface)) {
            res.sendRedirect("http://localhost:8080/login.html");
        } else {
            chain.doFilter(request, response);
        }		
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub		
	}
	

}
