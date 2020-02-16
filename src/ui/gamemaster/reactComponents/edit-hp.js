// This component breaks down how hp is calculated and let's the gm apply damage.

const css = require('./edit-hp.css')

module.exports = ({e, C}) => {
    return class extends React.Component {
        render() {
            return e('div', null,
                this.maxHPFormula(),
                this.editLethal(),
                this.editNonLethal(),
            )
        }

        maxHPFormula() {
            return e('table', {className: css.maxHP},
                e('thead', null,
                    e('tr', null, e('th', {colSpan: 2}, 'Max HP Breakdown')),
                ),
                e('tbody', null,
                    e('tr', null, e('th', null, '1D8 Hit Die'), e('td', null, '+7')),
                    e('tr', null, e('th', null, '1D8 Hit Die'), e('td', null, '+1')),
                    e('tr', null, e('th', null, '1D8 Hit Die'), e('td', null, '+4')),
                    e('tr', null, e('th', null, '1D8 Hit Die'), e('td', null, '+8')),
                    e('tr', null, e('th', null, 'Con Bonus'), e('td', null, '-4')),
                    e('tr', null, e('th', null, 'Favored Class'), e('td', null, '+1')),
                    e('tr', null, e('th', null, 'Favored Class'), e('td', null, '+1')),
                    e('tr', null, e('th', null, 'Favored Class'), e('td', null, '+1')),
                    e('tr', null, e('th', null, 'Max HP'), e('td', null, '20')),
                ),
            )
        }

        editLethal() {
            return this.editDamage({
                title: 'Lethal Damage',
                applied: '12',
            })
        }

        editNonLethal() {
            return this.editDamage({
                title: 'Non-Lethal Damage',
                applied: '0',
            })
        }

        editDamage({title, applied, onSubmit}) {
            return e('div', {className: css.editDamage},
                e('table', null,
                    e('thead', null,
                        e('tr', null, e('th', {colSpan: 2}, title)),
                    ),
                    e('tbody', null,
                        e('tr', null, e('th', null, 'Applied'), e('td', null, applied)),
                        e('tr', null, e('th', null, 'Set To'), e('td', null, e('input'))),
                    ),
                ),
                e('div', null, e('button', null, 'Apply')),
            )
        }
    }
}