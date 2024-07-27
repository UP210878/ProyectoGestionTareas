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
import java.util.Date;
import lombok.Data;
import com.example.p02.model.Category;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.OneToMany;
import java.util.List;
import jakarta.persistence.CascadeType;

@Data
@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "taskId")
    private Long taskId;

    @Column(name = "taskName", nullable = false, length = 30)
    @NotEmpty
    private String taskName;

    @Column(name = "dueDate")
    private Date dueDate;

    @Column(name = "completed")
    private Boolean completed;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryId", nullable = false)
    private Category category;

    @JsonManagedReference
    @OneToMany(mappedBy = "task", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Activity> activities;
}
