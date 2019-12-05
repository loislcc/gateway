package edu.buaa.domain.messaging;

import java.util.Objects;

public class TargetNotification {


    private String currentTime;
    private String category;
    private  double longitude;
    private  double latitude;

    private  double selfLongitude;
    private  double selfLatitude;

    public String getCurrentTime() {
        return currentTime;
    }

    public void setCurrentTime(String currentTime) {
        this.currentTime = currentTime;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getSelfLongitude() {
        return selfLongitude;
    }

    public void setSelfLongitude(double selfLongitude) {
        this.selfLongitude = selfLongitude;
    }

    public double getSelfLatitude() {
        return selfLatitude;
    }

    public void setSelfLatitude(double selfLatitude) {
        this.selfLatitude = selfLatitude;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TargetNotification that = (TargetNotification) o;
        return Double.compare(that.longitude, longitude) == 0 &&
            Double.compare(that.latitude, latitude) == 0 &&
            Double.compare(that.selfLongitude, selfLongitude) == 0 &&
            Double.compare(that.selfLatitude, selfLatitude) == 0 &&
            Objects.equals(currentTime, that.currentTime) &&
            Objects.equals(category, that.category);
    }

    @Override
    public int hashCode() {

        return Objects.hash(currentTime, category, longitude, latitude, selfLongitude, selfLatitude);
    }
}
