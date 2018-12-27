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

import org.springframework.stereotype.Component;

import coupon.sys.core.facade.CompanyFacadeInterface;

/**
 * this class is a filter for path /company/*
 * it checks if the user have a session from type companyFacade
 * 
 * @author YECHIEL.MOSHE
 *
 */
@Component
public class CompanyFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        
        if (req.getSession().getAttribute("facade") == null) {           	
            res.sendRedirect("http://localhost:8080/login.html");
        } else if(!(req.getSession().getAttribute("facade") instanceof CompanyFacadeInterface)){
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
