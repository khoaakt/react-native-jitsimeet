import JitsiMeet, { JitsiMeetView } from '@khoaakt/react-native-jitsimeet';
import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

const conferenceOptions = {
  room: 'ReactNativeJitsiRoom',
  userInfo: {
    displayName: 'React Native Jitsi Meet Example',
    email: 'example@test.com',
    avatar: 'https://picsum.photos/200',
  },
  featureFlags: {
    'live-streaming.enabled': false,
  },
};

function App() {
  const [showJitsiView, setShowJitsiView] = useState(false);

  const startJitsiAsNativeController = async () => {
    /* 
      Mode 1 - Starts a new Jitsi Activity/UIViewController on top of RN Application (outside of JS).
      It doesn't require rendering JitsiMeetView Component.
    */

    await JitsiMeet.launchJitsiMeetView(conferenceOptions);

    /*
      Note:
        JitsiMeet.launchJitsiMeetView will return a promise, which is resolved once the conference is terminated and the JitsiMeetView is dismissed.
    */
  };

  if (showJitsiView) {
    /* Mode 2 - Starts Jitsi as a RN View */

    return (
      <JitsiMeetView
        style={styles.jitsiMeetView}
        options={conferenceOptions}
        onConferenceTerminated={(_) => setShowJitsiView(false)}
        onConferenceJoined={(e) => console.log(e.nativeEvent)}
        onConferenceWillJoin={(e) => console.log(e.nativeEvent)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={startJitsiAsNativeController}
        style={({ pressed }) => [
          styles.pressable,
          { opacity: pressed ? 0.5 : 1 },
        ]}
      >
        <Text style={styles.pressableText}>
          Start Jitsi on top of RN Application
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setShowJitsiView(true)}
        style={({ pressed }) => [
          styles.pressable,
          { opacity: pressed ? 0.5 : 1 },
        ]}
      >
        <Text style={styles.pressableText}>Start Jitsi as a RN View</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable: {
    width: '80%',
    borderRadius: 15,
    height: 50,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  pressableText: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  jitsiMeetView: {
    flex: 1,
  },
});

export default App;
