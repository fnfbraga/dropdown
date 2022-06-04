import { InputHTMLAttributes, useState } from "react";
import { Popover } from "react-tiny-popover";
import "./App.css";

interface InputProps {
	inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ inputProps }) => {
	return <input {...inputProps} />;
};

interface ModalProps {
	inputValue: string;
	optionsComponent: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({ inputValue, optionsComponent }) => {
	return (
		<div className="Modal">
			<Input
				inputProps={{ autoFocus: true, value: inputValue, onChange: (e) => console.info("value", e.target.value) }}
			/>
			{optionsComponent}
		</div>
	);
};

const Options: React.FC = () => {
	const options = [
		{ label: "first", value: 1 },
		{ label: "second", value: 2 },
		{ label: "third", value: 3 },
	];

	return (
		<span>
			{options.map((o, i) => (
				<span key={i}>
					{o.label}
					<br />
				</span>
			))}
		</span>
	);
};

const App = () => {
	const [input, setInput] = useState("");
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	return (
		<div
			className="App"
			onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) => {
				setIsPopoverOpen(true);
				setInput(e.target.value);
			}}
		>
			<Popover
				isOpen={isPopoverOpen}
				positions={["bottom", "top"]}
				content={<Modal inputValue={input} optionsComponent={<Options />} />}
				onClickOutside={() => {
					setIsPopoverOpen(false);
				}}
			>
				<input defaultValue={input} className={isPopoverOpen ? "hideme" : "showme"} />
			</Popover>
		</div>
	);
};
export default App;
