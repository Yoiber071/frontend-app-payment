import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from '@edx/frontend-i18n';
import { StatefulButton, Input } from '@edx/paragon';

import { updateEnrollmentCodeQuantity } from './data/actions';
import { basketSelector } from './data/selectors';

function UpdateQuantityForm(props) {
  const id = 'code-quantity';

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    props.updateEnrollmentCodeQuantity(e.target.elements[id].value);
  });

  return (
    <form
      className="summary-row form-inline"
      onSubmit={handleSubmit}
    >
      <div className="form-group mr-2">
        <label htmlFor={id}>
          <FormattedMessage
            id="payment.update.quantity.label"
            defaultMessage="Quantity"
            description="Label for updating a quantity of enrollment codes to purchase"
          />
        </label>
        <div className="position-relative">
          <Input
            className="form-control-sm"
            name={id}
            id={id}
            max="100"
            min="1"
            type="number"
            style={{ width: '5rem' }}
            defaultValue={props.summaryQuantity}
          />
          <small
            className="text-muted small"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
            }}
          >
            <FormattedMessage
              id="payment.update.quantity.field.help.text"
              defaultMessage="Max: 100"
              description="Help text for updating a quantity of enrollment codes to purchase. Maximum 100 codes."
            />
          </small>
        </div>
      </div>
      <StatefulButton
        type="submit"
        state={props.updatingQuantity ? 'pending' : 'default'}
        labels={{
          default: (
            <FormattedMessage
              id="payment.update.quantity.submit.button"
              defaultMessage="Update"
              description="Button for updating a quantity of enrollment codes to purchase."
            />
          ),
        }}
        className="btn-primary btn-sm"
      />
    </form>
  );
}

UpdateQuantityForm.propTypes = {
  updateEnrollmentCodeQuantity: PropTypes.func.isRequired,
  summaryQuantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  updatingQuantity: PropTypes.bool,
};

UpdateQuantityForm.defaultProps = {
  summaryQuantity: undefined,
  updatingQuantity: false,
};

export default connect(
  basketSelector,
  {
    updateEnrollmentCodeQuantity,
  },
)(UpdateQuantityForm);