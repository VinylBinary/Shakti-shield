#include <ESP8266WiFi.h>
#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
using namespace std;
// Wi-Fi Credentials
const char* ssid = "M31";
const char* password = "7726060669ab";
String url1="/api/coords?latitude=";
String url2="&longitude=";
static const int RXPin = 12, TXPin = 14;
static const uint32_t GPSBaud = 9600;
WiFiClient client;
HTTPClient http;
TinyGPSPlus gps;
SoftwareSerial ss(RXPin, TXPin);

struct coordinates{
  int latitude;
  int longitude;
  };

void setup() {
  Serial.begin(9600);
  delay(1000);
  ss.begin(GPSBaud);
  setup_wifi();
}
coordinates get_coords(){
  struct coordinates output_struct;
  int latitude = 0;
  int longitude = 0;
  int output [] = {latitude, longitude};
  if(ss.available() > 0){
    gps.encode(ss.read());
    if (gps.location.isUpdated()){
      latitude = gps.location.lat();
      longitude = gps.location.lng();
      output[0] = latitude;
      output[1] = longitude;
      output_struct.latitude = latitude;
      output_struct.longitude = longitude;
      }  
    }
    
//   return output;
   return output_struct;
  }
void loop() {
  struct coordinates result;
  //Check WiFi connection status
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n\nPerforming HTTP GET Request\n");

    // HTTP Details
    String host_url="http://192.168.186.30:5000";
    int latitude = 123;
    int longitude = 123;
    result = get_coords();
    Serial.println(result.latitude);
    Serial.println(result.longitude); 
    host_url = host_url+url1+latitude+url2+longitude;
    
    http.begin(client, host_url);
    
    // Send HTTP GET request
    int httpResponseCode = http.GET();
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    if (httpResponseCode == HTTP_CODE_OK) {
      String payload = http.getString();
      Serial.println("Response payload: " + payload);

      DynamicJsonDocument doc(1024);
      deserializeJson(doc, payload);
      JsonObject obj = doc.as<JsonObject>();

      String value = obj[String("response")];
      Serial.println("\nresponse is : " + value);
    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    // Free resources
    http.end();

  } else {
    Serial.println("WiFi Disconnected");
  }
  delay(10000);
}

void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}