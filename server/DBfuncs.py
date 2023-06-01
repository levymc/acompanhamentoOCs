from sqlalchemy import Column, Integer, String, create_engine, func
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime

engine = create_engine('sqlite:///db/acompanhamentoOC.db', echo=False)
Session = sessionmaker(bind=engine)
Base = declarative_base()


class OCs(Base):
    __tablename__ = 'ocs'

    id = Column(Integer, primary_key=True)
    oc = Column(Integer)
    quantidadePecas = Column(Integer)
    data = Column(String)

    def __repr__(self):
        return f"""
                id: {self.id}  -  OC: {self.oc}, Quantidade de Peças: {self.quantidadePecas}, Data: {self.data}
                """

    @hybrid_property
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    @classmethod
    def insert(cls, oc, quantidadePecas, data):
        form40_instance = cls(oc=oc, quantidadePecas=quantidadePecas, data=data)

        session = Session()
        session.add(form40_instance)
        session.commit()

        # Consulta a linha recém-inserida
        linha_inserida = session.query(cls).filter_by(id=form40_instance.id).first().as_dict

        session.close()

        # Retorna a linha inserida
        return linha_inserida


    @classmethod
    def consulta(cls):
        session = Session()
        conteudo = [operador.as_dict for operador in session.query(cls).all()]
        session.close()
        return conteudo

    @classmethod
    def consultaEspecifica(cls, coluna, valor):
        session = Session()
        conteudo = [i.as_dict for i in session.query(cls).filter(getattr(cls, coluna) == valor).all()]
        session.close()
        return conteudo
