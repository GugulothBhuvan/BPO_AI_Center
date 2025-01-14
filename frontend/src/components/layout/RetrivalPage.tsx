import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Settings2, ArrowRight, Book, Search, Filter, Plus, Minus } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const DataRetrieval = () => {
  const Navigate = useNavigate();
  const [instructions, setInstructions] = useState([{ id: 1, value: '', checked: false }]);
  const [parameters, setParameters] = useState([{ id: 1, value: '' }]);
  const [selectedFields, setSelectedFields] = useState<number[]>([]);

  const addInstruction = () => {
    const newId = instructions[instructions.length - 1].id + 1;
    setInstructions([...instructions, { id: newId, value: '', checked: false }]);
  };

  const removeInstruction = (id: number) => {
    setInstructions(instructions.filter(inst => inst.id !== id));
  };

  const addParameter = () => {
    const newId = parameters[parameters.length - 1].id + 1;
    setParameters([...parameters, { id: newId, value: '' }]);
  };

  const removeParameter = (id: number) => {
    setParameters(parameters.filter(param => param.id !== id));
  };

  const toggleField = (index: number) => {
    setSelectedFields(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };
  const handleProced = () => {
    Navigate('/customeroutput');
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white min-h-screen">
      <Card className="shadow-lg border-0 overflow-hidden">
        <CardHeader className="bg-blue-50 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg rotate-3 transform hover:rotate-0 transition-transform duration-300">
                <Book className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800">
                Data Retrieval
              </CardTitle>
            </div>
            <Button
              variant="outline"
              className="hover:bg-blue-100 border-blue-200"
            >
              <Settings2 className="h-4 w-4 mr-2 text-blue-500" />
              View
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Instructions Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Search className="h-4 w-4 text-blue-500" />
                Instructions
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addInstruction}
                className="border-dashed border-blue-200 text-blue-500 hover:border-blue-500 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
              {instructions.map((instruction, index) => (
                <div
                  key={instruction.id}
                  className="flex items-center gap-2 group animate-fade-in"
                >
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <Checkbox
                    checked={instruction.checked}
                    onCheckedChange={() => {
                      const newInstructions = [...instructions];
                      newInstructions[index].checked = !newInstructions[index].checked;
                      setInstructions(newInstructions);
                    }}
                    className="data-[state=checked]:bg-blue-500"
                  />
                  <Input
                    value={instruction.value}
                    onChange={(e) => {
                      const newInstructions = [...instructions];
                      newInstructions[index].value = e.target.value;
                      setInstructions(newInstructions);
                    }}
                    placeholder="Enter instruction..."
                    className="flex-1 transition-all duration-300 border-gray-200 focus:ring-2 focus:ring-blue-500 hover:border-blue-300 rounded-xl"
                  />
                  {instructions.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeInstruction(instruction.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500 hover:text-red-600"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Parameters Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Filter className="h-4 w-4 text-blue-500" />
                Parameters
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addParameter}
                className="border-dashed border-blue-200 text-blue-500 hover:border-blue-500 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
              {parameters.map((parameter, index) => (
                <div
                  key={parameter.id}
                  className="flex items-center gap-2 group animate-fade-in"
                >
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <Input
                    value={parameter.value}
                    onChange={(e) => {
                      const newParameters = [...parameters];
                      newParameters[index].value = e.target.value;
                      setParameters(newParameters);
                    }}
                    placeholder="Enter parameter..."
                    className="flex-1 transition-all duration-300 border-gray-200 focus:ring-2 focus:ring-blue-500 hover:border-blue-300 rounded-xl"
                  />
                  {parameters.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeParameter(parameter.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500 hover:text-red-600"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Fields Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Filter className="h-4 w-4 text-blue-500" />
              Fields
            </Label>
            <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-xl">
              {['Document Type', 'Date Range', 'Category', 'Status'].map((field, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all duration-300"
                >
                  <Checkbox
                    checked={selectedFields.includes(index)}
                    onCheckedChange={() => toggleField(index)}
                    className="data-[state=checked]:bg-blue-500"
                  />
                  <Label className="text-sm text-gray-600 hover:text-blue-500 transition-colors duration-300">
                    {field}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50 px-6 py-4">
          <div className="ml-auto">
            <Button onClick={handleProced} className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 rounded-xl text-white">
              Process Data
              <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DataRetrieval;