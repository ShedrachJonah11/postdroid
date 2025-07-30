import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import {
  RequestData,
  Method,
  BodyType,
  Headers,
  Params,
} from "../../types/api";
import { Button } from "../../components/common/Button";
import { MethodSelector } from "./MethodSelector";
import { KeyValueEditor } from "./KeyValueEditor";
import { TabView } from "../../components/common/TabView";
import { ResponseSection } from "../response/ResponseSection";
import { Send, Plus } from "lucide-react-native";

type RequestBuilderProps = {
  onExecute: (request: RequestData) => void;
  isLoading: boolean;
};

export const RequestBuilder: React.FC<RequestBuilderProps> = ({
  onExecute,
  isLoading,
}) => {
  const { theme } = useTheme();
  const [isBodyFocused, setIsBodyFocused] = useState(false);

  const [requestData, setRequestData] = useState<RequestData>({
    url: "",
    method: "GET",
    headers: [],
    params: [],
    bodyType: "json",
    body: "",
  });

  const handleUrlChange = (text: string) => {
    setRequestData((prev) => ({ ...prev, url: text }));
  };

  const handleMethodChange = (method: Method) => {
    setRequestData((prev) => ({ ...prev, method }));
  };

  const handleHeadersChange = (headers: Headers) => {
    setRequestData((prev) => ({ ...prev, headers }));
  };

  const handleParamsChange = (params: Params) => {
    setRequestData((prev) => ({ ...prev, params }));
  };

  const handleBodyChange = (body: string) => {
    setRequestData((prev) => ({ ...prev, body }));
  };

  const handleBodyTypeChange = (bodyType: BodyType) => {
    setRequestData((prev) => ({ ...prev, bodyType }));
  };

  const handleSendRequest = () => {
    onExecute(requestData);
  };

  const addNewHeader = () => {
    const newHeaders = [...requestData.headers, { key: "", value: "" }];
    setRequestData((prev) => ({ ...prev, headers: newHeaders }));
  };

  const addNewParam = () => {
    const newParams = [...requestData.params, { key: "", value: "" }];
    setRequestData((prev) => ({ ...prev, params: newParams }));
  };

  const tabs = [
    {
      key: "params",
      title: "Params",
      content: (
        <View style={styles.tabContent}>
          <KeyValueEditor
            items={requestData.params}
            onChange={handleParamsChange}
            keyPlaceholder="Parameter name"
            valuePlaceholder="Value"
          />
          <Button
            icon={<Plus size={16} color="#FFFFFF" />}
            label="Add Parameter"
            onPress={addNewParam}
            variant="primary"
            size="small"
            style={{
              marginTop: 8,
              backgroundColor: theme.colors.button.addParameter.background,
              minWidth: 140,
              height: 44,
            }}
            textStyle={{ color: theme.colors.button.addParameter.text }}
          />
        </View>
      ),
    },
    {
      key: "headers",
      title: "Headers",
      content: (
        <View style={styles.tabContent}>
          <KeyValueEditor
            items={requestData.headers}
            onChange={handleHeadersChange}
            keyPlaceholder="Header name"
            valuePlaceholder="Value"
          />
          <Button
            icon={<Plus size={16} color="#FFFFFF" />}
            label="Add Header"
            onPress={addNewHeader}
            variant="primary"
            size="small"
            style={{
              marginTop: 8,
              backgroundColor: theme.colors.button.addParameter.background,
              minWidth: 140,
              height: 44,
            }}
            textStyle={{ color: theme.colors.button.addParameter.text }}
          />
        </View>
      ),
    },
    {
      key: "body",
      title: "Body",
      content: (
        <View style={styles.tabContent}>
          <View style={styles.bodyTypeSelector}>
            {["none", "json", "form", "text"].map((type) => {
              const isSelected = requestData.bodyType === type;
              return (
                <TouchableOpacity
                  key={type}
                  onPress={() => handleBodyTypeChange(type as any)}
                  style={[
                    styles.bodyTypeButton,
                    {
                      backgroundColor: isSelected
                        ? theme.colors.bodyTypeSelector.selectedBackground
                        : theme.colors.bodyTypeSelector.unselectedBackground,
                      borderColor: isSelected
                        ? "transparent"
                        : theme.colors.bodyTypeSelector.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.bodyTypeButtonText,
                      {
                        color: isSelected
                          ? theme.colors.bodyTypeSelector.selectedText
                          : theme.colors.bodyTypeSelector.unselectedText,
                        fontFamily: isSelected
                          ? theme.typography.fontFamily.semibold
                          : theme.typography.fontFamily.regular,
                      },
                    ]}
                  >
                    {type.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {requestData.bodyType === "none" ? (
            <View></View>
          ) : (
            <TextInput
              style={[
                styles.bodyInput,
                {
                  color: theme.colors.text,
                  backgroundColor: theme.colors.background,
                  borderColor: isBodyFocused
                    ? theme.colors.error
                    : theme.colors.input.border,
                  fontFamily: theme.typography.fontFamily.regular,
                },
              ]}
              multiline
              numberOfLines={8}
              value={requestData.body}
              onChangeText={handleBodyChange}
              onFocus={() => setIsBodyFocused(true)}
              onBlur={() => setIsBodyFocused(false)}
              placeholder={
                requestData.bodyType === "json"
                  ? '{\n  "key": "value"\n}'
                  : requestData.bodyType === "form"
                  ? "key=value&key2=value2"
                  : "Enter request body"
              }
              placeholderTextColor={theme.colors.subtext}
            />
          )}
        </View>
      ),
    },
  ];

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            marginHorizontal: theme.spacing.m,
            borderRadius: theme.borderRadius.medium,
          },
        ]}
      >
        <View style={styles.urlContainer}>
          <MethodSelector
            selectedMethod={requestData.method}
            onSelectMethod={handleMethodChange}
          />
          <TextInput
            style={[
              styles.urlInput,
              {
                color: theme.colors.text,
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.input.border,
                fontFamily: theme.typography.fontFamily.regular,
              },
            ]}
            value={requestData.url}
            onChangeText={handleUrlChange}
            placeholder="https://api.example.com/v1/endpoint"
            placeholderTextColor={theme.colors.subtext}
            autoCapitalize="none"
            keyboardType="url"
          />
        </View>

        <TabView tabs={tabs} />

        <View style={styles.actionContainer}>
          <View
            style={[
              styles.borderLine,
              {
                backgroundColor: theme.colors.borderLine,
              },
            ]}
          />
          <Button
            label="Send Request"
            onPress={handleSendRequest}
            isLoading={isLoading}
            icon={
              <Send size={16} color={theme.colors.button.sendRequest.text} />
            }
            iconPosition="left"
            fullWidth
            disabled={!requestData.url.trim()}
            style={{
              backgroundColor: theme.colors.button.sendRequest.background,
              height: 44,
            }}
            textStyle={{ color: theme.colors.button.sendRequest.text }}
          />
        </View>
      </View>

            {requestData.bodyType === "none" && (
        <ResponseSection />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    overflow: "hidden",
    marginTop: 24,
  },
  urlContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  urlInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  tabContent: {
    padding: 16,
  },
  bodyTypeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  bodyTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  bodyTypeButtonText: {
    fontSize: 14,
    textAlign: "center",
  },
  bodyInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    textAlignVertical: "top",
    height: 160,
  },
  actionContainer: {
    padding: 16,
  },
  borderLine: {
    height: 1,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  authText: {
    fontSize: 14,
    textAlign: "center",
  },
});
