package coupon.sys.services;

import java.sql.SQLException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class CouponSystemApplication extends SpringBootServletInitializer {
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(CouponSystemApplication.class);
	}

	public static void main(String[] args) throws SQLException {
		SpringApplication.run(CouponSystemApplication.class, args);
		
//		Test.startProj();
		
	}
}
