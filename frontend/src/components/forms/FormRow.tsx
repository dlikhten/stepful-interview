import { FC, ReactNode } from 'react';
import { isArray } from 'lodash-es';

export const FormRow: FC<{ components: ReactNode | ReactNode[] }> = ({ components }) => {
  return (
    <div className="max-w-md flex">
      {!isArray(components) ? (
        <div className="w-full">{components}</div>
      ) : components.length == 1 ? (
        <div className="w-full">{components[0]}</div>
      ) : components.length == 2 ? (
        <>
          <div className="w-1/2">{components[0]}</div>
          <div className="w-1/2 pl-2">{components[1]}</div>
        </>
      ) : components.length == 3 ? (
        <>
          <div className="w-1/2">{components[0]}</div>
          <div className="w-1/4 pl-2">{components[1]}</div>
          <div className="w-1/4 pl-2">{components[2]}</div>
        </>
      ) : (
        <div className="w-full">{components}</div>
      )}
    </div>
  );
};
