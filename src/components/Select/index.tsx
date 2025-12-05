import React, { useState, useContext, useEffect, useRef } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FormContext } from "../FormBase";
import "./Select.scss";

export interface Option {
  value: string;
  label: string;
}

export interface ISelectProps {
  name: string;
  options: Option[];
  multiple?: boolean;
  placeholder?: string;
}

const Select = ({ name, options, multiple = false, placeholder = "Select..." }: ISelectProps) => {
  const { values, setFieldValue } = useContext(FormContext);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Option[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (multiple && Array.isArray(values[name])) {
      setSelected(options.filter(o => values[name].includes(o.value)));
    } else if (!multiple && values[name]) {
      const sel = options.find(o => o.value === values[name]);
      setSelected(sel ? [sel] : []);
    }
  }, [values[name], options, multiple]);

  const toggleOpen = () => setOpen(prev => !prev);

  const handleSelect = (option: Option) => {
    let newSelected: Option[];
    if (multiple) {
      const exists = selected.find(s => s.value === option.value);
      newSelected = exists
        ? selected.filter(s => s.value !== option.value)
        : [...selected, option];
      setSelected(newSelected);
      setFieldValue(name, newSelected.map(s => s.value));
    } else {
      newSelected = [option];
      setSelected(newSelected);
      setFieldValue(name, option.value);
      setOpen(false);
    }
  };

  const filteredOptions = options.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="antd-select" ref={containerRef}>
      <div className={`select-input ${open ? "open" : ""}`} onClick={toggleOpen}>
        {multiple && selected.length > 0 ? (
          <div className="tags">
            {selected.map(s => (
              <span
                key={s.value}
                className="tag"
                onClick={e => {
                  e.stopPropagation();
                  handleSelect(s);
                }}
              >
                {s.label} ×
              </span>
            ))}
          </div>
        ) : selected[0] ? (
          <span>{selected[0].label}</span>
        ) : (
          <span className="placeholder"></span>
        )}
        <span className="arrow">{open ? <AiOutlineUp /> : <AiOutlineDown />}</span>
      </div>

      {open && (
        <div className="options">
          <input
            type="text"
            className="search"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
          {filteredOptions.length > 0 ? (
            filteredOptions.map(o => (
              <div
                key={o.value}
                className={`option ${selected.find(s => s.value === o.value) ? "selected" : ""}`}
                onClick={() => handleSelect(o)}
              >
                {o.label}
              </div>
            ))
          ) : (
            <div className="no-options">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
