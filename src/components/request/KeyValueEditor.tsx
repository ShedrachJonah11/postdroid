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
import { X, Edit3 } from "lucide-react-native";

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
              backgroundColor: theme.colors.keyValueEditor.background,
              borderColor: theme.colors.keyValueEditor.border,
            },
          ]}
        >
          <Edit3 size={16} color={theme.colors.keyValueEditor.icon} />
          
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.parameterText,
                {
                  color: theme.colors.keyValueEditor.text,
                  fontFamily: theme.typography.fontFamily.regular,
                },
              ]}
            >
              {item.key || keyPlaceholder}
            </Text>
            <Text
              style={[
                styles.valueText,
                {
                  color: theme.colors.keyValueEditor.text,
                  fontFamily: theme.typography.fontFamily.regular,
                },
              ]}
            >
              {item.value || valuePlaceholder}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => handleRemove(index)}
            style={styles.removeButton}
          >
            <X size={16} color={theme.colors.keyValueEditor.deleteIcon} />
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
    borderRadius: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 8,
    gap: 16,
  },
  parameterText: {
    fontSize: 14,
  },
  valueText: {
    fontSize: 14,
  },
  removeButton: {
    padding: 4,
    marginLeft: 8,
  },
});
