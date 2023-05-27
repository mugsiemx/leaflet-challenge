# leaflet-challenge
Module 15 Challenge - a new set of tools to visualize USGS earthquake data

![Earthquake Image](https://github.com/mugsiemx/leaflet-challenge/blob/main/Leaflet-Part-1/Images/pexels-sanej-prasad-suwal-7806175.jpg)

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.
Powered by leafletjs.com

![USGS Logo](https://github.com/mugsiemx/leaflet-challenge/blob/main/Leaflet-Part-1/Images/1-Logo.png)

Part 1: Create the Earthquake Visualization (we did not fully attempt Part 2)
- Create the Earthquake Visualization
-- The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON FeedLinks to an external site. page and choose a dataset to visualize through the following link: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson

![Requested Map Visual](https://github.com/mugsiemx/leaflet-challenge/blob/main/Leaflet-Part-1/Images/map.png)

- Import and visualize the data by doing the following:
-- Using Leaflet, create a map that plots all the earthquakes from the downloaded dataset based on their longitude and latitude.
-- Data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes appear larger, and earthquakes with greater depth appear darker in color.
-- Included popups that provide additional information (Location, Date, Magnitude, and Depth) about the earthquake when its associated marker is clicked. 
-- Created a legend that provides context for map data.


# References
- Dataset created by the United States Geological SurveyLinks to an external site..
-- https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
 -Earthquake image by Sanej Prasad Suwal - https://images.pexels.com/photos/7806175/pexels-photo-7806175.jpeg?cs=srgb&dl=pexels-sanej-prasad-suwal-7806175.jpg&fm=jpg
- Powered by leafletjs.com
- Data Analytics BootCamp MSU-VIRT-DATA-PT-11-2022-U-LOLC 15-Mapping Lesson 1, Activity 10-Stu_GeoJson
- CSS from the leaflet-choropleth documentation -Data Analytics BootCamp MSU-VIRT-DATA-PT-11-2022-U-LOLC 15-Mapping Lesson 2, Activity 04-Par_SchoolDistrictCloropleth (logic-step4.js)
- https://gis.stackexchange.com/questions/243831/how-to-use-oneachfeature-in-leaflet-js-map
- https://jsfiddle.net/adampax/r8ktzrkz/1/
- Change style of GeoJSON circle marker by feature properties https://gis.stackexchange.com/questions/220489/change-style-of-geojson-circle-marker-by-feature-properties
- https://gis.stackexchange.com/questions/133630/adding-leaflet-legend
--Credits to my support system: Our Instructor, Will; Learning Assistants, Michelle, Yasmine, and Randy; the BCS team; my colleagues: Rhi, Molly, Tazia, and Julie; and to my loving and patient husband, Eric.
