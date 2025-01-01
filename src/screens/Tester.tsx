import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Method } from "../types";
import { Picker } from "@react-native-picker/picker";
import { Req } from "../lib/request";
import { Res } from "../lib/response";

const METHODS: Method[] = ["GET", "POST"];
const { width: windowWidth } = Dimensions.get("window");

const APITester = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState(METHODS[0]);
  const [reqHeaders, setReqHeaders] = useState<string>("{}");
  const [reqBody, setReqBody] = useState<string>("{}");
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [resHeaders, setResHeaders] = useState<any>(null);
  const [resBody, setResBody] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    error && setError(null);
    responseTime && setResponseTime(null);
    reqHeaders && setReqHeaders("{}");
    resHeaders && setResHeaders(null);
    reqBody && setReqBody("{}");
    resBody && setResBody(null);
  };

  const handleRequest = async () => {
    reset();

    let parsedHeaders;
    try {
      parsedHeaders = JSON.parse(reqHeaders);
    } catch (e) {
      setError("Cannot parse headers");
      return;
    }

    try {
      const startTime = new Date().getTime();
      const request = new Req(url, method, parsedHeaders);
      const result = await request.fetch();
      const response = new Res(result);
      const endTime = new Date().getTime();
      const timeTaken = endTime - startTime;

      const responseHeaders = response.getHeaders();
      const body = await response.getBody();

      setResponseTime(timeTaken);
      setResHeaders(responseHeaders);
      setResBody(body);
    } catch (error) {
      setError(error.toString());
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Request</Text>
        <Text style={styles.label}>Method:</Text>
        <Picker
          style={{
            ...styles.select,
          }}
          selectedValue={method}
          onValueChange={(itemValue: Method) => setMethod(itemValue)}
        >
          {METHODS.map((item, i) => (
            <Picker.Item label={item} value={item} key={i} />
          ))}
        </Picker>
        <Text style={styles.label}>Endpoint:</Text>
        <TextInput
          style={styles.input}
          value={url}
          onChangeText={setUrl}
          placeholder="Enter API endpoint"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Headers (JSON format):</Text>
        <TextInput
          style={styles.input}
          value={reqHeaders}
          onChangeText={setReqHeaders}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Body (JSON format):</Text>
        <TextInput
          style={styles.input}
          value={reqBody}
          onChangeText={setReqBody}
          autoCapitalize="none"
        />

        <View style={styles.buttonWrapper}>
          <Button title="Go" onPress={handleRequest} />
        </View>
      </View>

      {error && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Error</Text>
          <Text style={styles.error}>Error: {error}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Response</Text>
        {responseTime !== null && (
          <View>
            <Text style={styles.label}>Response time:</Text>
            <Text style={styles.result}>{responseTime} ms</Text>
          </View>
        )}

        {resHeaders && (
          <View>
            <Text style={styles.label}>Response headers:</Text>
            <Text style={styles.result}>
              {JSON.stringify(resHeaders, null, 2)}
            </Text>
          </View>
        )}

        {resBody && (
          <View>
            <Text style={styles.label}>Response body:</Text>
            <Text style={styles.result}>
              {JSON.stringify(resBody, null, 2)}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontWeight: "800",
    textAlign: "center",
    fontSize: 18,
  },
  label: {
    fontWeight: "500",
    marginTop: 15,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  result: {
    marginTop: 10,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
    fontFamily: "monospace",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  buttonWrapper: {
    marginTop: 10,
  },
  select: {
    width: 0.9 * windowWidth,
    height: 60,
  },
});

export default APITester;
