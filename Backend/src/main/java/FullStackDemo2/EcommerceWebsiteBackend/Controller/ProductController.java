package FullStackDemo2.EcommerceWebsiteBackend.Controller;

import FullStackDemo2.EcommerceWebsiteBackend.Model.Product;
import FullStackDemo2.EcommerceWebsiteBackend.Service.EcommerceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin("http://localhost:3000")
public class ProductController {
    @Autowired
    private EcommerceService service;

    @GetMapping("/displayProducts")
    public List<Product> getAllProducts() {
        return service.getAllProducts();
    }

    @PostMapping("/addNewProduct")
    public void addNewProduct(@RequestBody Product product) {
        service.addNewProduct(product);
    }

    @GetMapping("/getProductById/{id}")
    public Product getProductById(@PathVariable int id) {
        return service.getProductById(id);
    }

    @PutMapping("/updateProduct/{id}")
    public void updateProduct(@RequestBody Product updatedProduct, @PathVariable int id) {
        service.updatedProduct(updatedProduct, id);
    }

    @DeleteMapping("/deleteProduct/{id}")
    public void  deleteProduct(@PathVariable int id) {
        service.deleteProduct(id);
    }
}

