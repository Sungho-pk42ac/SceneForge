import nextVitals from 'eslint-config-next/core-web-vitals';
export default [...nextVitals,{ignores:['.next/**','node_modules/**','test-results/**']},{rules:{'react-hooks/set-state-in-effect':'off','react-hooks/purity':'off','react-hooks/refs':'off','react-hooks/exhaustive-deps':'off','jsx-a11y/role-supports-aria-props':'off','@typescript-eslint/no-explicit-any':'off'}}];
