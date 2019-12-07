package edu.buaa.domain;

import java.util.Objects;

public class TargetNotification {


    private String currentTime;
    private String category;
    private String ip;
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

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TargetNotification that = (TargetNotification) o;

        if (Double.compare(that.longitude, longitude) != 0) return false;
        if (Double.compare(that.latitude, latitude) != 0) return false;
        if (Double.compare(that.selfLongitude, selfLongitude) != 0) return false;
        if (Double.compare(that.selfLatitude, selfLatitude) != 0) return false;
        if (currentTime != null ? !currentTime.equals(that.currentTime) : that.currentTime != null) return false;
        if (category != null ? !category.equals(that.category) : that.category != null) return false;
        return ip != null ? ip.equals(that.ip) : that.ip == null;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = currentTime != null ? currentTime.hashCode() : 0;
        result = 31 * result + (category != null ? category.hashCode() : 0);
        result = 31 * result + (ip != null ? ip.hashCode() : 0);
        temp = Double.doubleToLongBits(longitude);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(latitude);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(selfLongitude);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(selfLatitude);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
    }
}
