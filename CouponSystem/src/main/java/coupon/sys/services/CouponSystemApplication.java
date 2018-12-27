package coupon.sys.services;

import java.sql.SQLException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import coupon.sys.test.Test;

@SpringBootApplication
public class CouponSystemApplication {

	public static void main(String[] args) throws SQLException {
		SpringApplication.run(CouponSystemApplication.class, args);
		
		Test.startProj();
		
	}
}
