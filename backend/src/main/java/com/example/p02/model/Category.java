package com.example.p02.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import jakarta.persistence.CascadeType;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Data
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "categoryId")
    private Integer categoryId;

    // @ManyToOne(fetch = FetchType.EAGER)
    // @JoinColumn(name = "userId", nullable = false)
    // private User user;

    @NotEmpty
    @Column(name = "userId")
    private Long userId;

    @NotEmpty
    @Column(name = "categoryName", nullable = false, length = 30)
    private String categoryName;

    @JsonManagedReference
    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Task> tasks;
}
