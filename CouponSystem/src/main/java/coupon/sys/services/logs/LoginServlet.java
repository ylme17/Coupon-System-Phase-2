package coupon.sys.services.logs;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import coupon.sys.core.couponSystem.CouponSystem;
import coupon.sys.core.exceptions.CouponSystemException;
import coupon.sys.core.facade.AdminFacadeInterface;
import coupon.sys.core.facade.ClientFacade;
import coupon.sys.core.facade.CompanyFacadeInterface;
import coupon.sys.core.facade.CustomerFacadeInterface;

/**
 * this class is a login servlet for users to log in the system
 * 
 * @author YECHIEL.MOSHE
 *
 */
@Controller
@CrossOrigin("*")
public class LoginServlet {
	
	@PostMapping(value="/login")
	public String login(@RequestParam String name, @RequestParam String password, HttpServletRequest request) throws CouponSystemException {

		try {
			ClientFacade clientFacade = CouponSystem.getInstance().login(name, password);
			
			if (clientFacade == null)
			{
				return "redirect:http://localhost:8080/login.html";
			}
			
			request.getSession().setAttribute("facade", clientFacade);
			
			if(clientFacade instanceof AdminFacadeInterface) {
				return "redirect:http://localhost:8080/admin/index.html";
			} else if(clientFacade instanceof CompanyFacadeInterface) {
				return "redirect:http://localhost:8080/company/index.html";
			} else if(clientFacade instanceof CustomerFacadeInterface) {
				return "redirect:http://localhost:8080/customer/index.html";
			}
			return "redirect:http://localhost:8080/login.html";

		} catch (CouponSystemException e) {
			return "redirect:http://localhost:8080/login.html";
		}
		
	}
	
}
