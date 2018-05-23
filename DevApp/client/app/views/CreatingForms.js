import React from 'react';
import styled from 'styled-components';
import { Frame, Markdown, VMContext, withTheme } from 'elements';
import { Alert, Button, Element, Form, Panel, NumberField, TextField } from 'elements';
import Expander from '../components/Expander';

const CreatingForms = props => (
   <VMContext vm="CreatingForms">
      <Frame width="95%">
         <Markdown id="CreatingForms">
            <Expander label={<SeeItLive />} content={<BasicForm vm="BasicForm" />} />
            <Expander label={<SeeItLive />} content={<BasicForm vm="AsyncValidation" />} />
         </Markdown>
      </Frame>
   </VMContext>
);

const SeeItLive = _ => <b>See its Live!</b>;

const BasicForm = props => (
   <VMContext vm={props.vm}>
      <Form>
         <Alert id="SubmitResponse" />
         <Panel>
            <TextField id="Name" />
            <TextField id="Email" />
            <Button id="Register" submit />
         </Panel>
      </Form>
   </VMContext>
);

export default withTheme(CreatingForms);