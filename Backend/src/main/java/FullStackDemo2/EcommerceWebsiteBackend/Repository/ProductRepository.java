package FullStackDemo2.EcommerceWebsiteBackend.Repository;

import FullStackDemo2.EcommerceWebsiteBackend.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = "select * from Product where Product_id=:id", nativeQuery = true)
    Product getProductById(@Param("id") int id);
}
