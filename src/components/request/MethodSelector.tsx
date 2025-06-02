import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Method } from "../../types/api";
import { ChevronDown } from "lucide-react-native";

type MethodSelectorProps = {
  selectedMethod: Method;
  onSelectMethod: (method: Method) => void;
};

export const MethodSelector: React.FC<MethodSelectorProps> = ({
  selectedMethod,
  onSelectMethod,
}) => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const methods: Method[] = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "OPTIONS",
    "HEAD",
  ];

  const handleMethodSelect = (method: Method) => {
    onSelectMethod(method);
    setModalVisible(false);
  };

  const getMethodColor = (method: Method) => {
    return theme.colors.requestMethodColors[method];
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[
          styles.methodButton,
          {
            backgroundColor: getMethodColor(selectedMethod) + "20",
            borderColor: getMethodColor(selectedMethod),
          },
        ]}
      >
        <Text
          style={[
            styles.methodButtonText,
            {
              color: getMethodColor(selectedMethod),
              fontFamily: theme.typography.fontFamily.medium,
            },
          ]}
        >
          {selectedMethod}
        </Text>
        <ChevronDown size={16} color={getMethodColor(selectedMethod)} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            {methods.map((method) => (
              <TouchableOpacity
                key={method}
                style={[
                  styles.methodItem,
                  {
                    backgroundColor:
                      method === selectedMethod
                        ? getMethodColor(method) + "20"
                        : "transparent",
                  },
                ]}
                onPress={() => handleMethodSelect(method)}
              >
                <Text
                  style={[
                    styles.methodItemText,
                    {
                      color: getMethodColor(method),
                      fontFamily:
                        method === selectedMethod
                          ? theme.typography.fontFamily.semibold
                          : theme.typography.fontFamily.regular,
                    },
                  ]}
                >
                  {method}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  methodButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
    minWidth: 80,
  },
  methodButtonText: {
    fontSize: 14,
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    borderRadius: 8,
    borderWidth: 1,
    width: "60%",
    maxWidth: 300,
  },
  methodItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  methodItemText: {
    fontSize: 14,
    textAlign: "center",
  },
});
