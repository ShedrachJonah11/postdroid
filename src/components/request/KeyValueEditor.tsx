import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { KeyValuePair } from "../../types/api";
import { X } from "lucide-react-native";

type KeyValueEditorProps = {
  items: KeyValuePair[];
  onChange: (items: KeyValuePair[]) => void;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
};

export const KeyValueEditor: React.FC<KeyValueEditorProps> = ({
  items,
  onChange,
  keyPlaceholder = "Key",
  valuePlaceholder = "Value",
}) => {
  const { theme } = useTheme();

  const handleKeyChange = (index: number, text: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], key: text };
    onChange(newItems);
  };

  const handleValueChange = (index: number, text: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], value: text };
    onChange(newItems);
  };

  const handleRemove = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text
          style={[
            styles.emptyText,
            {
              color: theme.colors.subtext,
              fontFamily: theme.typography.fontFamily.regular,
            },
          ]}
        >
          No item.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View
          key={index}
          style={[
            styles.itemContainer,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View style={styles.inputsContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.colors.text,
                  fontFamily: theme.typography.fontFamily.regular,
                  opacity: 1,
                },
              ]}
              value={item.key}
              onChangeText={(text) => handleKeyChange(index, text)}
              placeholder={keyPlaceholder}
              placeholderTextColor={theme.colors.subtext}
              autoCapitalize="none"
            />
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.colors.text,
                  fontFamily: theme.typography.fontFamily.regular,
                  opacity: 1,
                },
              ]}
              value={item.value}
              onChangeText={(text) => handleValueChange(index, text)}
              placeholder={valuePlaceholder}
              placeholderTextColor={theme.colors.subtext}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            onPress={() => handleRemove(index)}
            style={styles.removeButton}
          >
            <X size={16} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  emptyText: {
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  toggleButton: {
    padding: 4,
  },
  inputsContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  removeButton: {
    padding: 4,
  },
});
