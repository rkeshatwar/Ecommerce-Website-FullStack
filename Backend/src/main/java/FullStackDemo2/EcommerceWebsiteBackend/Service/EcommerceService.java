package FullStackDemo2.EcommerceWebsiteBackend.Service;

import FullStackDemo2.EcommerceWebsiteBackend.Model.Cart;
import FullStackDemo2.EcommerceWebsiteBackend.Model.Product;
import FullStackDemo2.EcommerceWebsiteBackend.Repository.CartRepository;
import FullStackDemo2.EcommerceWebsiteBackend.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EcommerceService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartRepository cartRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Cart> getAllCartProducts() {
        return cartRepository.findAll();
    }

    public void addToCart(int id) {
        Cart cart = cartRepository.getCartProductById(id);
        if (cart==null) {
            Product product = productRepository.getProductById(id);
            Cart cart1 = new Cart();
            cart1.setProductId(product.getProductId());
            cart1.setProductQty(product.getProductQty());
            cart1.setProductName(product.getProductName());
            cart1.setProductPrice(product.getProductPrice());
            cart1.setProductDiscountedPrice(product.getDiscountedPrice());
            cart1.setTempQty(1);
            cartRepository.save(cart1);
        }else {
            cart.setTempQty(cart.getTempQty()+1);
            cartRepository.save(cart);
        }
    }

    public void increment(int id) {
        Cart cart = cartRepository.getCartProductByCartId(id);
        cart.setTempQty(cart.getTempQty()+1);
        cartRepository.save(cart);
    }

    public void decrement(int id) {
        Cart cart = cartRepository.getCartProductByCartId(id);
        if (cart.getTempQty()==1) {
            cartRepository.deleteById(id);
        } else {
            cart.setTempQty(cart.getTempQty() - 1);
            cartRepository.save(cart);
        }
    }

    public void addNewProduct(Product product) {
        productRepository.save(product);
    }

    public Product getProductById(int id) {
        return productRepository.getProductById(id);
    }

    public void updatedProduct(Product updatedProduct, int id) {
        Product existingProduct = productRepository.getProductById(id);

        existingProduct.setProductName(updatedProduct.getProductName());
        existingProduct.setBrand(updatedProduct.getBrand());
        existingProduct.setProductPrice(updatedProduct.getProductPrice());
        existingProduct.setDiscountedPrice(updatedProduct.getDiscountedPrice());
        existingProduct.setProductCategory(updatedProduct.getProductCategory());
        existingProduct.setSubCategory(updatedProduct.getSubCategory());
        existingProduct.setProductQty(updatedProduct.getProductQty());

        productRepository.save(existingProduct);
    }

    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }
}
