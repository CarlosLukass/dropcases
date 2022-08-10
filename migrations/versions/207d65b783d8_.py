"""empty message

Revision ID: 207d65b783d8
Revises: f6adcafe3819
Create Date: 2022-08-09 02:29:14.624922

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '207d65b783d8'
down_revision = 'f6adcafe3819'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('user_lawyer_id_key', 'user', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('user_lawyer_id_key', 'user', ['lawyer_id'])
    # ### end Alembic commands ###