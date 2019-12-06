package edu.buaa.domain;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Notification.
 */

public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String x;

    private String y;

    private String type;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        this.y = y;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
