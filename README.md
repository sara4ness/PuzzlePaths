#include <MPR121.h>
#include <Wire.h>

#define numElectrodes 12

int i;
      
int val = 50;

void setup() {
  Serial.begin( 9600 );
  Wire.begin();

  // Setup MPR121
  MPR121.begin( 0x5c );
  MPR121.setInterruptPin( 4 );
  MPR121.setTouchThreshold( 40 );
  MPR121.setReleaseThreshold( 20 );
}

void loop() {
  // Check for new data
  MPR121.updateTouchData();
  MPR121.updateFilteredData();

  // Get an analog proximity value
  //Serial.println( MPR121.getFilteredData( 1 ) );


  for (i = 0; i < 12; i++) {
     if ( MPR121.getTouchData( i ) ) {
    Serial.println(i);
  } 
  }
  
  delay(100);
}
