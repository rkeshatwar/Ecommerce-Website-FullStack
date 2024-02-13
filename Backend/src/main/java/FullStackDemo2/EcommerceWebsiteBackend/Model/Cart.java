package FullStackDemo2.EcommerceWebsiteBackend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartId;

    private int productId;

    private String productName;

    private double productPrice;

    private double productDiscountedPrice;

    private String productQty;

    private int tempQty;

}
