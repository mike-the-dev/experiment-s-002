"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface InstrumentSelectorProps {
  field: any; // TanStack Form FieldApi type is complex, using any for simplicity
  availableInstruments: string[];
}

export function InstrumentSelector({ field, availableInstruments }: InstrumentSelectorProps) {
  const [selectedInstrument, setSelectedInstrument] = React.useState<string>("");

  const handleAddInstrument = () => {
    if (selectedInstrument && !field.state.value.includes(selectedInstrument)) {
      field.handleChange([...field.state.value, selectedInstrument]);
      setSelectedInstrument("");
      // Trigger blur after value change
      setTimeout(() => field.handleBlur(), 0);
    }
  };

  const handleRemoveInstrument = (instrument: string) => {
    field.handleChange(field.state.value.filter((i: string) => i !== instrument));
    // Trigger blur after value change
    setTimeout(() => field.handleBlur(), 0);
  };

  return (
    <div>
      <div className="flex gap-2">
        <Select value={selectedInstrument} onValueChange={setSelectedInstrument}>
          <SelectTrigger id="instruments" className="flex-1">
            <SelectValue placeholder="Select instruments you teach" />
          </SelectTrigger>
          <SelectContent>
            {availableInstruments.map((instrument) => (
              <SelectItem key={instrument} value={instrument}>
                {instrument}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddInstrument}
          disabled={!selectedInstrument || field.state.value.includes(selectedInstrument)}
          className="cursor-pointer hover:bg-[#BE5EED] hover:text-white"
        >
          Add
        </Button>
      </div>
      {field.state.value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {field.state.value.map((instrument: string) => (
            <div
              key={instrument}
              className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
            >
              <span>{instrument}</span>
              <button
                type="button"
                onClick={() => handleRemoveInstrument(instrument)}
                className="hover:text-purple-900"
                onBlur={field.handleBlur}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

