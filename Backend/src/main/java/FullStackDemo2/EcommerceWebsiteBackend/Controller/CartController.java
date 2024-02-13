package FullStackDemo2.EcommerceWebsiteBackend.Controller;

import FullStackDemo2.EcommerceWebsiteBackend.Model.Cart;
import FullStackDemo2.EcommerceWebsiteBackend.Service.EcommerceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin("http://localhost:3000")
public class CartController {
    @Autowired
    private EcommerceService service;

    @GetMapping("/displayCartProducts")
    public List<Cart> getAllCartProducts() {
        return service.getAllCartProducts();
    }

    @PostMapping("/addToCart/{id}")
    public void addToCart(@PathVariable int id) {
        service.addToCart(id);
    }

    @PostMapping("/increaseCartProduct/{id}")
    public void increment(@PathVariable int id) {
        service.increment(id);
    }

    @PostMapping("/decreaseCartProduct/{id}")
    public void decrement(@PathVariable int id) {
        service.decrement(id);
    }
}
