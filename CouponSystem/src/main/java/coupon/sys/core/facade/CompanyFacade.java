package coupon.sys.core.facade;

import java.util.Collection;
import java.util.Date;

import coupon.sys.core.beans.Company;
import coupon.sys.core.beans.Coupon;
import coupon.sys.core.beans.CouponType;
import coupon.sys.core.dao.CompanyDAO;
import coupon.sys.core.dao.CouponDAO;
import coupon.sys.core.exceptions.DbException;
import coupon.sys.core.exceptions.ObjectAlreadyExistException;
import coupon.sys.core.exceptions.ObjectDontExistException;
import coupon.sys.core.utils.CurrentDate;

/**
 * this class implements the business logic of company
 * 
 * @author YECHIEL.MOSHE
 *
 */
public class CompanyFacade implements ClientFacade, CompanyFacadeInterface {

	private CompanyDAO companyDAO;
	private CouponDAO couponDAO;

	/**
	 * construct the company facade and get company, companyDao and couponDao
	 * 
	 * @param couponDAO
	 * @param companyDAO
	 */
	public CompanyFacade(CouponDAO couponDAO, CompanyDAO companyDAO) {
		this.couponDAO = couponDAO;
		this.companyDAO = companyDAO;
	}

	/**
	 * this method create coupon for company first check if coupon exist by title
	 * then create the coupon and insert to company-coupon
	 * 
	 * @param coupon
	 * @throws ObjectAlreadyExistException
	 * @throws DbException
	 */
	public void createCoupon(Coupon coupon) throws ObjectAlreadyExistException, DbException {
		if (couponDAO.checkIfExist(coupon) == false) {
			if(!coupon.getEndDate().before(CurrentDate.getCurrentDate())) {
				coupon.setStartDate(CurrentDate.getCurrentDate());
				couponDAO.createCoupon(coupon);
				companyDAO.insertCouponCreation(coupon.getId());
				System.out.println("coupon created [title: " + coupon.getTitle() + ", id: " + coupon.getId() + "]");
			} else {
				throw new DbException("End Date must be from now on");
			}
		} else {
			throw new ObjectAlreadyExistException("coupon '" + coupon.getTitle() + "', is already exist");
		}
	}

	/**
	 * this method remove coupon for company first check if coupon belong to company
	 * then remove the coupon from customer-coupon and company-coupon tables then
	 * remove the coupon itself
	 * 
	 * @param coupon
	 * @throws DbException
	 * @throws ObjectDontExistException
	 */
	public void removeCoupon(Coupon coupon) throws ObjectDontExistException, DbException {
		if (companyDAO.couponBelongComapny(coupon.getId())) {
			couponDAO.removeCustomerCoupon(coupon);
			couponDAO.removeCompanyCoupon(coupon);
			couponDAO.removeCoupon(coupon);
			System.out.println("coupon " + coupon.getId() + " deleted");
		} else {
			throw new ObjectDontExistException("coupon " + coupon.getId() + " not belong to company");
		}
	}

	/**
	 * this method update coupon only for end-date and price
	 * 
	 * @param coupon
	 * @throws ObjectDontExistException
	 * @throws DbException
	 */
	public void updateCoupon(Coupon coupon) throws ObjectDontExistException, DbException {
		Coupon coupondb = couponDAO.getCoupon(coupon.getId());
		if (companyDAO.couponBelongComapny(coupondb.getId())) {
			if(coupon.getEndDate()!=null) {
				coupondb.setEndDate(coupon.getEndDate());
			} else {
				coupondb.setEndDate(coupondb.getEndDate());
			}
			if(coupon.getPrice()!=0) {
				coupondb.setPrice(coupon.getPrice());
			} else {
				coupondb.setPrice(coupondb.getPrice());
			}
			if(!coupon.getEndDate().before(CurrentDate.getCurrentDate())) {
				couponDAO.updateCoupon(coupondb);
				System.out.println("coupon " + coupon.getId() + " updated");
			} else {
				throw new DbException("End Date must be from now on");
			}
		} else {
			throw new ObjectDontExistException("coupon " + coupon.getId() + " not belong to company");
		}
	}

	/**
	 * this method get coupon for company
	 * 
	 * @param id
	 * @return coupon
	 * @throws ObjectDontExistException
	 * @throws DbException
	 */
	public Coupon getCoupon(long id) throws ObjectDontExistException, DbException {
		Coupon coupon = couponDAO.getCoupon(id);
		if(coupon != null) {
			if (companyDAO.couponBelongComapny(id)) {
				System.out.println(coupon.toString());
				return coupon;
			} else {
				throw new ObjectDontExistException("coupon " + coupon.getId() + " not belong to company");
			}
		} else {
			throw new ObjectDontExistException("coupon not exist");
		}
	}

	/**
	 * this method get all coupons for company
	 * 
	 * @return
	 * @throws ObjectDontExistException
	 * @throws DbException
	 */
	public Collection<Coupon> getAllCoupons() throws ObjectDontExistException, DbException {
		Collection<Coupon> allCoupon = companyDAO.getCoupons();
		if (!allCoupon.isEmpty()) {
			System.out.println(allCoupon.toString());
			return allCoupon;
		} else {
			throw new ObjectDontExistException("There are no coupons");
		}
	}

	/**
	 * this method get coupons by type
	 * 
	 * @param type
	 * @return coupons by type
	 * @throws ObjectDontExistException
	 * @throws DbException
	 */
	public Collection<Coupon> getCouponByType(CouponType type) throws ObjectDontExistException, DbException {
		Collection<Coupon> couponByType = companyDAO.getCouponByType(type);
		if (!couponByType.isEmpty()) {
			System.out.println(couponByType.toString());
			return couponByType;
		} else {
			throw new ObjectDontExistException("There are not coupons of type " + type);
		}
	}

	/**
	 * this method get company info
	 * 
	 * @return company information
	 * @throws DbException
	 */
	public Company getCompanyInfo() throws DbException {
		Company companyInfo = companyDAO.getCompany();
		System.out.println(companyInfo);
		return companyInfo;
	}

	/**
	 * this method get coupons by price for company
	 * 
	 * @param price
	 * @return coupons by price
	 * @throws ObjectDontExistException
	 * @throws DbException
	 */
	public Collection<Coupon> getCouponByPrice(double price) throws ObjectDontExistException, DbException {
		Collection<Coupon> couponByPrice = companyDAO.getCouponsByPrice(price);
		if (!couponByPrice.isEmpty()) {
			System.out.println(couponByPrice.toString());
			return couponByPrice;
		} else {
			throw new ObjectDontExistException("There are not coupons up to price " + price);
		}
	}

	/**
	 * this method get coupons by start-date for company
	 * 
	 * @param date
	 * @return coupon up to date
	 * @throws ObjectDontExistException
	 * @throws DbException
	 */
	public Collection<Coupon> getCouponByStartDate(Date date) throws ObjectDontExistException, DbException {
		Collection<Coupon> couponByDate = companyDAO.getCouponsByStartDate(date);
		if (!couponByDate.isEmpty()) {
			System.out.println(couponByDate.toString());
			return couponByDate;
		} else {
			throw new ObjectDontExistException("There are no coupons started before " + date);
		}
	}

}
