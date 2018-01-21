import React from 'react';
import { PropTypes } from 'prop-types';
import { FieldPanel } from '../layout/FieldPanel';
import { ContextTypes } from '../VMContext';
import { VMInput } from '../VMInput';
import * as utils from '../utils';

export class RadioGroup extends React.Component {

    static contextTypes = ContextTypes;

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
    }

    static componentTypes = {
        Container: FieldPanel,
        LabelComponent: undefined,
        RadioContainer: undefined,
        RadioLabelComponent: undefined,
        InputComponent: undefined
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.vmInput = new VMInput(this.context, this.props.id);
    }

    handleChange = (event) =>this.vmInput.value = event.target.value;

    render() {
        const [Container, Label, RadioContainer, RadioLabel, Input] = utils.resolveComponents(RadioGroup, this.props);
        const { id, value, attrs } = this.vmInput.props;

        const radio = (attrs.options || []).map(opt => (
            <RadioContainer check key={opt.Key} id={id}>
                <RadioLabel check>
                    <Input type="radio" name={id} value={opt.Key} checked={opt.Key == value} onChange={this.handleChange} />
                    {opt.Value}
                </RadioLabel>
            </RadioContainer>
        ));
        
        const label = attrs.label || this.props.label;

        return (
            <Container horizontal={this.props.horizontal}>
                {label ? <Label for={id}>{label}</Label> : null}
                <section>{radio}</section>
            </Container>
        );
    }
}