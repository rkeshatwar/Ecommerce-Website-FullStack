package FullStackDemo2.EcommerceWebsiteBackend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Product_Id")
    private int productId;

    @Column(name = "Product_Name")
    private String productName;

    @Column(name = "Product_Category")
    private String productCategory;

    @Column(name = "Product_SubCategory")
    private String subCategory;

    @Column(name = "Product_Brand")
    private String brand;

    @Column(name = "Product_Quantity")
    private String productQty;

    @Column(name = "Product_Price")
    private double productPrice;

    @Column(name = "Product_Discountedprice")
    private double discountedPrice;

}

