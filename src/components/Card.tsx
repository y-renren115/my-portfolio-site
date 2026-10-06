import React from 'react';

type CardProps = {
  title: string;
  description: React.ReactNode;
  children?: React.ReactNode;
};

type CardWithLineBreaksProps = {
  title: string;
  description: string;
};

export const Card: React.FC<CardProps> = ({ title, description }) => {
  let lines;
  if (typeof description === 'string') {
    lines = description.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index !== description.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      {typeof description === 'string' ? <div>{lines}</div> : <div className="text-gray-700 text-base">{description}</div>}
    </div>
  );
};

export const CardWithLineBreaks: React.FC<CardWithLineBreaksProps> = ({ title, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-3">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 text-base whitespace-pre-line">
        {description}
      </p>
    </div>
  );
}
