package create.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * this class create DB
 * 
 * @author YECHIEL.MOSHE
 *
 */
public class DBMethods {

	private static final String URL = "jdbc:derby:CouponSysdb;create=true";
	private static final String DRIVER = "org.apache.derby.jdbc.EmbeddedDriver";
	
	/**
	 * this method creates DB
	 * @throws SQLException
	 */
	public static void createDb() throws SQLException {
		Connection con = null;
		try {

			Class.forName(DRIVER);
			System.out.println("driver loaded");
			con = DriverManager.getConnection(URL);
			System.out.println("db created");
		} catch (ClassNotFoundException | SQLException e) {
			System.out.println("db not created");
		} finally {
			if (con != null) {
				con.close();
			}
		}
	}
	
	/**
	 * this method creates tables for DB
	 */
	public static void createTables() {

		String url = "jdbc:derby:CouponSysdb";

		try (Connection con = DriverManager.getConnection(url)) {
			Statement stmt = con.createStatement();

			String CompanyTable = "CREATE TABLE company(id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, company_name VARCHAR(255), "
					+ "password VARCHAR(255), email VARCHAR(255))";
			stmt.execute(CompanyTable);

			String CustomerTable = "CREATE TABLE customer(id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, customer_name VARCHAR(255), "
					+ "password VARCHAR(255))";
			stmt.execute(CustomerTable);

			String CouponTable = "CREATE TABLE coupon(id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, title VARCHAR(255), start_date DATE, "
					+ "end_date DATE, amount INTEGER, type VARCHAR(50), message VARCHAR(255), price DOUBLE, image VARCHAR(255))";
			stmt.execute(CouponTable);

			String CustomerCouponTable = "CREATE TABLE customer_coupon(customer_id BIGINT, coupon_id BIGINT, "
					+ "PRIMARY KEY(customer_id, coupon_id))";
			stmt.execute(CustomerCouponTable);

			String CompanyCouponTable = "CREATE TABLE company_coupon(company_id BIGINT, coupon_id BIGINT, "
					+ "PRIMARY KEY(company_id, coupon_id))";
			stmt.execute(CompanyCouponTable);

			System.out.println("tables created");
		} catch (SQLException e) {
			System.out.println("tables not created");
		}
	}
	
	/**
	 * this method delete all tables from DB
	 */
	public static void dropAllTables() {

		String url = "jdbc:derby:CouponSysdb";

		try (Connection con = DriverManager.getConnection(url)) {
			Statement st = con.createStatement();

			String dropCompanyTableSql = "DROP TABLE company";
			st.execute(dropCompanyTableSql);

			String dropCustomerTableSql = "DROP TABLE customer";
			st.execute(dropCustomerTableSql);

			String dropCouponTableSql = "DROP TABLE coupon";
			st.execute(dropCouponTableSql);

			String dropCompanyCouponTableSql = "DROP TABLE company_coupon";
			st.execute(dropCompanyCouponTableSql);

			String dropCustomerCouponTableSql = "DROP TABLE customer_coupon";
			st.execute(dropCustomerCouponTableSql);

			st.close();
			System.out.println("tables deleted");
		} catch (SQLException e) {
			System.out.println("tables not deleted - " + e);
		}

	}

}
