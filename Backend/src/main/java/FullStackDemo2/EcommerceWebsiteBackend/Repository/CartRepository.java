package FullStackDemo2.EcommerceWebsiteBackend.Repository;

import FullStackDemo2.EcommerceWebsiteBackend.Model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

    @Query(value = "select * from Cart where product_id=:id", nativeQuery = true)
    Cart getCartProductById(@Param("id") int id);

    @Query(value = "select * from Cart where cart_id=:id", nativeQuery = true)
    Cart getCartProductByCartId(int id);
}
